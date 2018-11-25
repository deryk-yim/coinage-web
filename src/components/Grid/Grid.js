import React from 'react';
import PropTypes from 'prop-types';
import {
    getStyle, getSize, getOffset, getOrder, getPosition,
} from './functions';
import './grid.css';

export const Grid = (props) => {
    const {
        style, className, nopadding,
        center, children,
    } = props;
    const styles = style && getStyle(style);
    const nodeClass = className || '';
    const nopaddingClass = nopadding && 'nopadding';
    const centerClass = center && 'center';
    const gridClasses = [
        'gridContainer',
        nodeClass,
        nopaddingClass,
        centerClass,
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
    children: PropTypes.node,
};
Grid.defaultProps = {
    style: undefined,
    className: undefined,
    nopadding: undefined,
    center: undefined,
    children: undefined,
};

export const Row = (props) => {
    const {
        style, className, center,
        top, bottom, left, right,
        children,
    } = props;
    const styles = style && getStyle(style);
    const nodeClass = className || '';
    const positionClass = getPosition('row', {
        center, top, bottom, left, right,
    });
    const rowClasses = [
        'row',
        nodeClass,
        positionClass,
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
    children: PropTypes.node,
};
Row.defaultProps = {
    style: undefined,
    className: undefined,
    center: undefined,
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
    children: undefined,
};


export const Col = (props) => {
    const {
        size, offset, order, style,
        className, nopadding, center,
        top, bottom, left, right,
        children,
    } = props;
    const styles = getStyle(style);
    const nodeClass = className || '';
    const sizeClass = size && getSize(size);
    const offsetClass = offset && getOffset(offset);
    const orderClass = order && getOrder(order);
    const nopaddingClass = nopadding && 'nopadding';
    const positionClass = getPosition('col', {
        center, top, bottom, left, right,
    });
    const columnClasses = [
        'column',
        nodeClass,
        sizeClass,
        offsetClass,
        orderClass,
        nopaddingClass,
        positionClass,
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
    children: PropTypes.node,
};
Col.defaultProps = {
    style: undefined,
    className: undefined,
    size: undefined,
    offset: undefined,
    order: undefined,
    nopadding: undefined,
    center: undefined,
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
    children: undefined,
};
