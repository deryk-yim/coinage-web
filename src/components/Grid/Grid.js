import React from 'react';
import { getStyle, getSize, getOffset, getOrder } from './functions';
import './grid.css';

export class Grid extends React.Component {
    render() {
        const { style, className, nopadding, center } = this.props;
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
                {this.props.children}
            </div>
        );
    }
}

export class Row extends React.Component {
    render() {
        const { style, className } = this.props;
        const styles = style && getStyle(style)
            , nodeClass = className ? className : '';
        const rowClasses = [
            'row',
            nodeClass
        ].filter(item => item).join(' ');

        return (
            <div className={rowClasses} style={styles}>
                {this.props.children}
            </div>
        );
    }
}

export class Col extends React.Component {
    render() {
        const { size, offset, order, style, className, nopadding, center, top, bottom, left, right } = this.props;
        const styles = getStyle(style)
            , nodeClass = className ? className : ''
            , sizeClass = size && getSize(size)
            , offsetClass = offset && getOffset(offset)
            , orderClass = order && getOrder(order)
            , nopaddingClass = nopadding && 'nopadding'
            , centerClass = center && 'col-center-content'
            , topClass = top && 'col-top-content'
            , bottomClass = bottom && 'col-bottom-content'
            , leftClass = left && 'col-left-content'
            , rightClass = right && 'col-right-content';
        const columnClasses = [
                'column',
                nodeClass, 
                sizeClass, 
                offsetClass, 
                orderClass, 
                nopaddingClass,
                centerClass,
                topClass,
                bottomClass,
                leftClass,
                rightClass
            ].filter(item => item).join(' ');

        return (
            <div className={columnClasses} style={styles}>
                {this.props.children}
            </div>
        );
    }
}
