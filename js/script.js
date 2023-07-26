const titleClickHandler = function (event) {

    event.preventDefault();
    const clickedElement = this;

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
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
};

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = "tag-size-",
    optAuthorsListSelector = '.authors.list';


function generateTitleLinks(customSelector = '') {

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for (const article of articles) {
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

    generateAuthors();
    addClickListenersToAuthors();
}

generateTitleLinks();

function calculateTagsParams(tags) {
    const params = {
        min: 999999,
        max: 0
    }

    for (let tag in tags) {
        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.min);
    }
    return params;
}

function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber;
}

function generateTags() {

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* make html variable with empty string */
    let allTags = {};


    /* START LOOP: for every article: */
    for (const article of articles) {
        let html = '';
        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');

        /* find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);

        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');

        /* START LOOP: for each tag */
        for (let tag of articleTagsArray) {

            /* generate HTML of the link */
            const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';

            /* add generated code to html variable */
            html = html + tagHTML;

            if (!allTags[tag]) {
                /* [NEW] add tag to allTags object */
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
            /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
        tagsWrapper.innerHTML = html;

        /* END LOOP: for every article: */
    }
    const tagList = document.querySelector(optTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    let allTagsHTML = '';

    for (let tag in allTags) {
        allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li> ';
    }

    tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');


    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* find all tag links with class active */
    const allActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(allActiveLinks);

    /* START LOOP: for each active tag link */
    for (const activeLink of allActiveLinks) {
        /* remove class active */
        activeLink.classList.remove('active');
        /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (const tagLink of tagLinks) {
        /* add class active */
        tagLink.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags() {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (const tagLink of tagLinks) {
        /* add tagClickHandler as event listener for that link */
        tagLink.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
    /* znajdź wszystkie artykuły */
    const articles = document.querySelectorAll(optArticleSelector);

    /* stwórz pusty obiekt, który będzie zawierał informacje o liczbie artykułów dla każdego autora */
    let authorsData = {};

    /* dla każdego artykułu */
    for (const article of articles) {
        /* pobierz autora z atrybutu data-author */
        const author = article.getAttribute('data-author');

        /* jeśli autor jest już w obiekcie authorsData, zwiększ licznik artykułów dla tego autora */
        if (authorsData[author]) {
            authorsData[author]++;
        } else {
            /* jeśli autor nie jest jeszcze w obiekcie authorsData, dodaj go i ustaw licznik na 1 */
            authorsData[author] = 1;
        }

        /* znajdź wrapper dla autora */
        const authorWrapper = article.querySelector('.post-author');

        /* dodaj link autora jako jego zawartość */
        authorWrapper.innerHTML = '<a href="#" data-author="' + author + '">' + author + '</a>';
    }

    /* znajdź listę autorów */
    const authorList = document.querySelector(optAuthorsListSelector);

    /* stwórz zmienną przechowującą kod HTML dla wszystkich autorów */
    let allAuthorsHTML = '';

    /* dla każdego autora w obiekcie authorsData */
    for (const author in authorsData) {
        /* dodaj link autora wraz z liczbą artykułów do zmiennej allAuthorsHTML */
        allAuthorsHTML += '<li><a href="#" data-author="' + author + '">' + author + ' (' + authorsData[author] + ')</a></li>';
    }

    /* wstaw kod HTML z linkami autorów do listy autorów */
    authorList.innerHTML = allAuthorsHTML;
}



function addClickListenersToAuthors() {
    /* znajdź wszystkie linki autorów w prawej kolumnie */
    const authorLinks = document.querySelectorAll(optAuthorsListSelector + ' a');

    /* dla każdego linku autora w prawej kolumnie */
    for (const authorLink of authorLinks) {
        /* dodaj click event listener z funkcją authorClickHandler */
        authorLink.addEventListener('click', authorClickHandler);
    }
}



function authorClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;
    const author = clickedElement.getAttribute('data-author');

    /* usuń klasę 'active' ze wszystkich linków autorów */
    const activeAuthorLinks = document.querySelectorAll(optAuthorsListSelector + ' a.active');
    for (const activeAuthorLink of activeAuthorLinks) {
        activeAuthorLink.classList.remove('active');
    }

    /* dodaj klasę 'active' do klikniętego linku autora */
    clickedElement.classList.add('active');

    /* wywołaj funkcję generateTitleLinks z odpowiednim argumentem */
    generateTitleLinks('[data-author="' + author + '"]');
}


