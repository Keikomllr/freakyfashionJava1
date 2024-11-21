document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-button');
        
        header.addEventListener('click', function() {
            // activeクラスの切り替え
            item.classList.toggle('active');
        });
    });

    // 画面サイズに応じてアコーディオンの動作を無効化
    function checkScreenSize() {
        if (window.innerWidth >= 640) {
            accordionItems.forEach(item => {
                item.classList.add('active');
            });
        } else {
            accordionItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    }

    // ロード時とリサイズ時に画面サイズをチェック
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});
