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
        numFeaturedItems = +$('#featured-items').val(),
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

function objectIsDouble(object) {
    if (object && object.type == "double") {
        return true;
    }

    return false;
}

function objectIsSingle(object) {
    if (object && object.type == "single") {
        return true;
    }

    return false;
}

function redraw() {
    var $grid = $('.grid-container'),
        objects = buildObjectArray(),
        itemNumber = 1,
        duplicates = [], // An array of items that need rendering at the next suitable opportunity
        duplicatesRequired,
        nextItem = null; // Override the default item - used when pulling an item up a rolumn

    $grid.empty();
    // Calculate width
    // $grid.css('width', (((objects.length + 2) / 2) * 248));

    for (var i = 0; i < objects.length; i++) {
        if (objectIsSingle(objects[i])) {
            if (objectIsDouble(objects[i+1])) {
                duplicatesRequired = 3 - itemNumber % 3;
                if (duplicatesRequired == 1) {
                    $grid.append(buildFeaturedItem(itemNumber));
                    $grid.append(buildFeaturedItem(itemNumber+1, "show-in-three"));
                    nextItem = buildFeaturedItem(itemNumber+1, "hide-in-three");
                } else if (duplicatesRequired == 2) {
                    $grid.append(buildFeaturedItem(itemNumber, "hide-in-three"));
                    duplicates.push(buildFeaturedItem(itemNumber, "show-in-three"));
                } else {
                    $grid.append(buildFeaturedItem(itemNumber));
                }
            } else {
                if (nextItem !== null) {
                    $grid.append(nextItem);
                    nextItem = null;
                } else {
                    $grid.append(buildFeaturedItem(itemNumber));
                }
            }
            itemNumber += 1;
        } else {
            $grid.append(buildCollectionItem(objects[i]['class']));
            if (duplicates.length > 0 && objectIsSingle(objects[i+1])) {
                $grid.append(duplicates[0]);
                duplicates = [];
            }
        }
    }
}

redraw();

$('#curated-rolumn, #popular-rolumn, #featured-items').on('change', redraw);
