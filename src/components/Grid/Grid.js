import React from 'react';

import {
    getStyle, getSize, getOffset, getOrder,
    } from './functions';

import './grid.css';

export const Grid = () => {
        const { style, className, nopadding } = this.props;
        const styles = style && getStyle(style),
        nodeClass = className ? className : '',
        nopaddingClass = nopadding && 'nopadding';
        const gridClasses = [
            'gridContainer',
            nodeClass,
            nopaddingClass,
        ].filter(item => item).join(' ');
        return (
            <div className={gridClasses} style={styles}>
                {this.props.children}
            </div>
        );
};

export const Row = () => {
        const { style, className } = this.props;
        const styles = style && getStyle(style),
        nodeClass = className ? className : '';
        const rowClasses = [
            'row',
            nodeClass
        ].filter(item => item).join(' ');
        return (
            <div className={rowClasses} style={styles}>
                {this.props.children}
            </div>
        );
};

export const Col = () => {
        const { 
            size, offset, order, style, className, nopadding,
        } = this.props;
        const styles = getStyle(style),
            nodeClass = className ? className : '',
            sizeClass = size && getSize(size),
            offsetClass = offset && getOffset(offset),
            orderClass = order && getOrder(order),
            nopaddingClass = nopadding && 'nopadding';
        const columnClasses = [
                'column',
                nodeClass,
                sizeClass,
                offsetClass,
                orderClass,
                nopaddingClass,
            ].filter(item => item).join(' ');

        return (
            <div className={columnClasses} style={styles}>
                {this.props.children}
            </div>
        );
};
