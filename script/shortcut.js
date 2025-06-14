document.addEventListener('DOMContentLoaded', () => {
    const tagButtons = document.querySelectorAll('.tag-btn');
    const shortcutItems = document.querySelectorAll('.shortcut-item');

    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성화된 버튼 스타일 변경
            tagButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedTag = button.dataset.tag;

            // 아이템 필터링
            shortcutItems.forEach(item => {
                if (selectedTag === 'all') {
                    item.style.display = 'block';
                } else {
                    const itemTags = item.dataset.tags.split(' ');
                    item.style.display = itemTags.includes(selectedTag) ? 'block' : 'none';
                }
            });
        });
    });
}); 