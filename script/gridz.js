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

function buildCollectionItem(rolumn) {
    var $container = $('<div/>', {
            'class': 'grid-item double'
        }),
        $content = $('<div/>', {
            'class': 'content'
        }).appendTo($container);

    $('<a/>', {
        href: '#'
    }).text('C').appendTo($content);

    return $container;
}

var $grid = $('.grid-container'),
    popularRolumn = 1,
    curatedRolumn = 2,
    dupes = [];

$grid.append(buildCollectionItem());

for (var i = 1; i <= 18; i++) {
    if (i === 5) {
        $grid.append(buildFeaturedItem(i, 'before-duplicate'));
        $grid.append(buildFeaturedItem(i+1, 'before-duplicate'));
        dupes.push(i);
        dupes.push(i+1);
        $grid.append(buildCollectionItem());
    }
    if (dupes.indexOf(i) === -1) {
        $grid.append(buildFeaturedItem(i));
    } else {
        $grid.append(buildFeaturedItem(i, 'after-duplicate'));
    }
}
