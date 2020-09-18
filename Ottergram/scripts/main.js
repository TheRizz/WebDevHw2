var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function addNextClickHandler(next, thumbnails) {
    'use strict';
    //list of all thumbnails
    // var thumbnailitems = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    // var thumbnails = [].slice.call(thumbnails);
    //current detail image (big image)
    // console.log(thumbnails);
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);

    next.addEventListener('click', function (event) {
        event.preventDefault();
        // console.log("clicked");
        //find current thumbnail
        //calculate if you can update
        if (detailImage.getAttribute('src') == thumbnails[4].getAttribute('src')) {
            //detail image is the last thumbnail image, cannot go next
            // console.log("last item");
        } else {
            //find which thumbnail it is
            var thumbnailCount = 0;
            // console.log("not last item");

            for (var i = 0; i < 4; i++) {
                //console.log(detailImage.getAttribute('src'));
                // console.log(thumbnails[i]);
                if (detailImage.getAttribute('src') == thumbnails[i].getAttribute('data-image-url')) {
                    // console.log("found thumbnail");
                    thumbnailCount = i + 1;
                    break;
                }
            }
            //set details from thumb
            //console.log("thumbnailCount", thumbnailCount);
            setDetailsFromThumb(thumbnails[thumbnailCount]);
            // console.log(thumbnails[thumbnailCount]);
            showDetails();
        }

    });

}

function addPrevClickHandler(next, thumbnails) {
    'use strict';
    //list of all thumbnails
    // var thumbnailitems = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    // var thumbnails = [].slice.call(thumbnails);
    //current detail image (big image)
    // console.log(thumbnails);
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);

    next.addEventListener('click', function (event) {
        event.preventDefault();
        // console.log("clicked");
        //find current thumbnail
        //calculate if you can update
        if (detailImage.getAttribute('src') == thumbnails[0].getAttribute('src')) {
            //detail image is the last thumbnail image, cannot go next
            // console.log("last item");
        } else {
            //find which thumbnail it is
            var thumbnailCount = 4;
            // console.log("not last item");

            for (var i = 0; i <= 4; i++) {
                // console.log(detailImage.getAttribute('src'));
                // console.log(thumbnails[i].getAttribute('data-image-url'));
                if (detailImage.getAttribute('src') == thumbnails[i].getAttribute('data-image-url')) {
                    // console.log("found thumbnail");
                    thumbnailCount = i - 1;

                    if (thumbnailCount == -1) {
                        thumbnailCount = 4;
                    }

                    break;
                }
            }
            //set details from thumb
            // console.log("thumbnailCount", thumbnailCount);
            setDetailsFromThumb(thumbnails[thumbnailCount]);
            // console.log(thumbnails[thumbnailCount]); 
            showDetails();
        }

    });

}


function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    var nextButton = document.querySelector('[data-image-role="next"]');
    var prevButton = document.querySelector('[data-image-role="prev"]');
    addNextClickHandler(nextButton, thumbnails);
    addPrevClickHandler(prevButton, thumbnails);
    addKeyPressHandler();
}

initializeEvents();