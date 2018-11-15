import React from 'react';
import { getStyle, getSize, getOffset, getOrder, getPosition } from './functions';
import './grid.css';
// import { resolveCname } from 'dns';
import PropTypes from 'prop-types';



export const Grid = (props) => {
    const { style, className, nopadding, center, children } = props;
    const styles = style && getStyle(style)
        , nodeClass = className ? className : ''
        , nopaddingClass = nopadding && 'nopadding'
        , centerClass = center && 'center';
    const gridClasses = [
        'gridContainer',
        nodeClass,
        nopaddingClass,
        centerClass
    ].filter(item => item).join(' ');
    return (
        <div className={gridClasses} style={styles}>
            {children}
        </div>
    );
};

Grid.propTypes = {
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    className: PropTypes.string,
    nopadding: PropTypes.bool,
    center: PropTypes.bool,
    children: PropTypes.node
}


export const Row = (props) => {
    const { style, className, center, top, bottom, left, right, children } = props;
    const styles = style && getStyle(style)
        , nodeClass = className ? className : ''
        , positionClass = getPosition('row', { center, top, bottom, left, right });
    const rowClasses = [
        'row',
        nodeClass,
        positionClass
    ].filter(item => item).join(' ');
    return (
        <div className={rowClasses} style={styles}>
            {children}
        </div>
    );
};

Row.propTypes = {
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])), 
    className: PropTypes.string, 
    center: PropTypes.bool, 
    top: PropTypes.bool, 
    bottom: PropTypes.bool, 
    left: PropTypes.bool, 
    right: PropTypes.bool, 
    children: PropTypes.node
}


export const Col = (props) => {
    const { size, offset, order, style, className, nopadding, center, top, bottom, left, right, children } = props;
    const styles = getStyle(style)
        , nodeClass = className ? className : ''
        , sizeClass = size && getSize(size)
        , offsetClass = offset && getOffset(offset)
        , orderClass = order && getOrder(order)
        , nopaddingClass = nopadding && 'nopadding'
        , positionClass = getPosition('col', { center, top, bottom, left, right });
    const columnClasses = [
        'column',
        nodeClass,
        sizeClass,
        offsetClass,
        orderClass,
        nopaddingClass,
        positionClass
    ].filter(item => item).join(' ');
    return (
        <div className={columnClasses} style={styles}>
            {children}
        </div>
    );
};

Col.propTypes = {
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    className: PropTypes.string,
    size: PropTypes.objectOf(PropTypes.number),
    offset: PropTypes.objectOf(PropTypes.number),
    order: PropTypes.objectOf(PropTypes.number),
    nopadding: PropTypes.bool,
    center: PropTypes.bool,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    left: PropTypes.bool,
    right: PropTypes.bool,
    children: PropTypes.node
}
