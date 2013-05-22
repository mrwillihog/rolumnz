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
        popular = $('#popular-rolumn').val(),
        curated = $('#curated-rolumn').val(),
        numFeaturedItems = 18;

    if (curated == popular) {
        curated += 1;
    }

    for (var i = 0; i < numFeaturedItems; i++) {
        objects[i] = {
            type: "single"
        };
        if (popular - 1 == i || curated - 1 == i) {
            objects[i].type = "double";
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
            if (objects[i+1] && objects[i+1].type == "double") {
                $grid.append(buildFeaturedItem(itemNumber, 'before-duplicate'));
            } else {
                $grid.append(buildFeaturedItem(itemNumber));
            }
            itemNumber += 1;
        } else {
            $grid.append(buildCollectionItem("popular"));
            if (objects[i-1] && objects[i-1].type == "single") {
                // No need to duplicate
                $grid.append(buildFeaturedItem(itemNumber, 'after-duplicate'));
            }
        }
    }
}

redraw();

$('#curated-rolumn').on('change', redraw);
$('#popular-rolumn').on('change', redraw);
