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

function singleItem() {
    return {
        type: "single"
    };
}

function doubleItem(type) {
    return {
        'type': "double",
        'class': type
    };
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
        objects[i] = singleItem();
        if (popularIndex - 1 == i) {
            objects[i] = doubleItem("popular");
            numFeaturedItems += 1;
        } else if (curatedIndex - 1 == i) {
            objects[i] = doubleItem("curated");
            numFeaturedItems += 1;
        }
    }

    // If there is a double height item at the end then add it now
    if (popularIndex > numFeaturedItems) {
        objects[objects.length] = doubleItem("popular");
    }
    if (curatedIndex > numFeaturedItems) {
        objects[objects.length] = doubleItem("curated");
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

function updateDuplicateCount () {
    var $count = $('.duplicatonz strong'),
        $duplicates = $('.show-in-three');

    $count.text($duplicates.length);
}

function redraw() {
    var $grid = $('.grid-container'),
        objects = buildObjectArray(),
        itemNumber = 1,
        duplicatesRequired,
        pushedItem = null, // An item that needs to be pushed down a row
        pulledItem = null; // An item that needs to be pulled up a row

    $grid.empty();

    for (var i = 0; i < objects.length; i++) {

        // Last item before a double item - handle duplication here.
        if (objectIsSingle(objects[i]) && objectIsDouble(objects[i+1])) {
            duplicatesRequired = 3 - itemNumber % 3;
            if (duplicatesRequired == 1) {
                // Pull an item up a row in Group 3
                // Append this item as normal
                $grid.append(buildFeaturedItem(itemNumber));
                // Append the next item to show in group 3 (hidden in other groups)
                $grid.append(buildFeaturedItem(itemNumber+1, "show-in-three"));
                // Store the next item to hide in group 3 but show in other groups. This is rendered in the next iteration of the loop
                pulledItem = buildFeaturedItem(itemNumber+1, "hide-in-three");
            } else if (duplicatesRequired == 2) {
                // Push an item down a row in Group 3
                // Append the item tagged as hide in group 3
                $grid.append(buildFeaturedItem(itemNumber, "hide-in-three"));
                // Add a duplicate that is shown in group 3, to be inserted at the next available opportunity.
                pushedItem = buildFeaturedItem(itemNumber, "show-in-three");
            } else {
                // No duplicates required, carry on as normal
                $grid.append(buildFeaturedItem(itemNumber));
            }
            // Item added, increase the counter
            itemNumber += 1;
        // Item is a single item not proceeded by a double item
        } else if (objectIsSingle(objects[i]) && !objectIsDouble(objects[i+1])) {
            // If we have an item cached - use that instead
            if (pulledItem !== null) {
                $grid.append(pulledItem);
                // Reset the cached item
                pulledItem = null;
            } else {
                // Happy path - single item with no cache.
                $grid.append(buildFeaturedItem(itemNumber));
            }
            // Item added, increase counter
            itemNumber += 1;
        // Item is a double height item
        } else if (objectIsDouble(objects[i])) {
            $grid.append(buildCollectionItem(objects[i]['class']));
            // If we have an item to be pushed down and the next item isnt another double height item
            if (pushedItem && objectIsSingle(objects[i+1])) {
                // Add the duplicate
                $grid.append(pushedItem);
                // Reset the duplicate
                pushedItem = null;
            }
        }
    }

    updateDuplicateCount();
}

redraw();

$('#curated-rolumn, #popular-rolumn, #featured-items').on('change', redraw);
