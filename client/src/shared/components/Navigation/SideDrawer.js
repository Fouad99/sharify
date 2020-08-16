import React from 'react';
import ReactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

export const SideDrawer = props => {
    const content = (
        <CSSTransition
            in={props.show}
            timeout={300}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <div>
                <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>;
            </div>
        </CSSTransition>);

    return ReactDom.createPortal(content, document.getElementById('drawer-hook'));
}

export default SideDrawer;