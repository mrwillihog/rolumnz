function buildFeaturedItem(number, dupeClass) {
    var $container = $('<div/>', {
            'class': 'grid-item item-' + number
        }),
        $content = $('<div/>', {
            'class': 'content'
        }).appendTo($container);

    // Breakpoints 1, 2 & 4
    if (number % 2 === 0) {
        $container.addClass('even');
    } else {
        $container.addClass('odd');
    }

    // Breakpoint 3
    if (number % 3 === 1) {
        $container.addClass('left');
    } else if (number % 3 === 2) {
        $container.addClass('middle');
    } else {
        $container.addClass('right');
    }

    if (dupeClass) {
        $container.addClass(dupeClass);
    }

    $('<a/>', {
        href: '#'
    }).text(number).appendTo($content);

    return $container;
}

function buildCollectionItem(groupClass) {
    var $container = $('<div/>', {
            'class': 'grid-item double'
        }),
        $content = $('<div/>', {
            'class': 'content'
        }).appendTo($container),
        text = "C";

    $container.addClass(groupClass);

    if (groupClass == "popular") {
        text = "P";
    }

    $('<a/>', {
        href: '#'
    }).text(text).appendTo($content);

    return $container;
}

function buildObjectArray() {
    var objects = [],
        popular = +$('#popular-rolumn').val(),
        curated = +$('#curated-rolumn').val(),
        numFeaturedItems = 18,
        popularIndex,
        curatedIndex;

    if (curated == popular) {
        curated += 1;
    }

    popularIndex = popular * 2 - 1;
    curatedIndex = curated * 2 - 1;

    if (popularIndex < curatedIndex) {
        curatedIndex -= 1;
    } else {
        popularIndex -= 1;
    }

    console.log(popularIndex, curatedIndex);

    for (var i = 0; i < numFeaturedItems; i++) {
        objects[i] = {
            type: "single"
        };
        if (popularIndex - 1 == i || curatedIndex - 1 == i) {
            objects[i].type = "double";
            if (popularIndex - 1 == i) {
                objects[i]['class'] = "popular";
            } else {
                objects[i]['class'] = "curated";
            }
            numFeaturedItems += 1;
        }
    }
    return objects;
}

function redraw() {
    var $grid = $('.grid-container'),
        objects = buildObjectArray(),
        itemNumber = 1;

    $grid.empty();

    console.log(objects);

    for (var i = 0; i < objects.length; i++) {
        if (objects[i].type == "single" ) {
            $grid.append(buildFeaturedItem(itemNumber));
            itemNumber += 1;
        } else {
            $grid.append(buildCollectionItem(objects[i]['class']));
        }
    }
}

redraw();

$('#curated-rolumn').on('change', redraw);
$('#popular-rolumn').on('change', redraw);
