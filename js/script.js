const titleClickHandler = function(event){

    event.preventDefault();
    const clickedElement = this;

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active')
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const activeLink = document.querySelector('.titles a.active');
    const hrefToArticle = activeLink.getAttribute('href');


    /* find the correct article using the selector (value of 'href' attribute) */
    const articleToShow = document.querySelector(hrefToArticle);


    /* add class 'active' to the correct article */
    articleToShow.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}