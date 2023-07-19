{
    const titleClickHandler = function (event) {

        event.preventDefault();
        const clickedElement = this;

        /* remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active')
        }

        /* add class 'active' to the clicked link */
        clickedElement.classList.add('active');

        /* remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.post.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* get 'href' attribute from the clicked link */
        const hrefToArticle = clickedElement.getAttribute('href');


        /* find the correct article using the selector (value of 'href' attribute) */
        const articleToShow = document.querySelector(hrefToArticle);


        /* add class 'active' to the correct article */
        articleToShow.classList.add('active');
    }


    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks(){


        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        const articles = document.querySelectorAll(optArticleSelector);
        let html = '';

        for(article of articles){
         const articleId = article.getAttribute('id');
         const articleTitle = article.querySelector(optTitleSelector).innerHTML;
         const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

             html = html + linkHTML;
        }
        titleList.innerHTML = html;

        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();
}