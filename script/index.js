function loadPage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error("페이지 로딩 실패");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            document.getElementById('content').innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    // 탭 전환 기능
    const tabButtons = document.querySelectorAll('.tab-btn');
    const contentFrame = document.getElementById('content-frame');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성화된 탭 버튼 스타일 변경
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // iframe 내용 변경
            const tabName = button.dataset.tab;
            contentFrame.src = `subPage/${tabName}.html`;
        });
    });

    // 노트 기능
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note');
    const notesList = document.getElementById('notes-list');

    // 로컬 스토리지에서 노트 불러오기
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = createNoteElement(note, index);
            notesList.appendChild(noteElement);
        });
    }

    // 노트 요소 생성
    function createNoteElement(note, index) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-item';
        noteDiv.innerHTML = `
            <button class="delete-note">×</button>
            <div class="note-content">${note}</div>
        `;

        // 삭제 버튼 이벤트
        const deleteBtn = noteDiv.querySelector('.delete-note');
        deleteBtn.addEventListener('click', () => {
            const notes = JSON.parse(localStorage.getItem('notes') || '[]');
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
        });

        return noteDiv;
    }

    // 노트 추가
    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            const notes = JSON.parse(localStorage.getItem('notes') || '[]');
            notes.unshift(noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            loadNotes();
        }
    });

    // Enter 키로 노트 추가
    noteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addNoteBtn.click();
        }
    });

    // 초기 노트 로드
    loadNotes();
});