export function getStyle(style) {
    const styles = {};
    if (style) {
        Object.keys(style).forEach((property) => {
            styles[property] = style[property];
        });
    }
    return styles;
}

export function getSize(size) {
    let sizeClass = '';
    if (size) {
        sizeClass += Object.keys(size).map((viewport) => {
            return viewport !== 'xs' ? `col-${viewport}-${size[viewport]}` : `col-${size[viewport]}`;
        }).join(' ');
    }
    return sizeClass;
}

export function getOffset(offset) {
    let offsetClass = '';
    if (offset) {
        offsetClass += Object.keys(offset).map((viewport) => {
            return viewport !== 'xs' ? `offset-${viewport}-${offset[viewport]}` : `offset-${offset[viewport]}`;
        }).join(' ');
    }
    return offsetClass;
}

export function getOrder(order) {
    let orderClass = '';
    if (order) {
        orderClass += Object.keys(order).map((viewport) => {
            return viewport !== 'xs' ? `order-${viewport}-${order[viewport]}` : `order-${order[viewport]}`;
        }).join(' ');
    }
    return orderClass;
}
