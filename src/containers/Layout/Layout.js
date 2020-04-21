import React, {Component} from 'react';

// import 'bootstrap/dist/css/bootstrap.css';

import classes from './Layout.module.css';
import Navigation from '../Navigation/Navigation';
import { Alert } from 'react-bootstrap';
import Notebook from '../../components/Notebook/Notebook';

function checkConfigValidity(config) {
    // get the linked configuration.js content
    const conf = window.Config; 
    
    // check if config and navigation config exist
    if (!conf || !conf.navigation || !Array.isArray(conf.navigation)) {
        return false;
    }

    // every navigation object needs a label and either a link or another navigation
    if (!conf.navigation.every(e => !!(e.label && (e.link || e.navigation))  )) {
        return false;
    }
    return conf;
};

const themeLoader = (name) => {
    return import(`./themes/${name}.min.css`);
}

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validConfig: checkConfigValidity(),
            currentLink: 'index.md',
            currentSite: {type: 'static'}
        };
    }

    navigateHandler = link => {
        if (link !== this.state.currentLink) {
            const site = this.findSiteFromLink(link);
            
            // DEV
//            console.log(`navigateHandler, searching site ${link} found: `)
//            console.log(site);
            this.setState({currentLink: link, currentSite: site});
        }
    }

    findSiteFromLink = link => {
        let site = null;
        this.state.validConfig.navigation.forEach(element => {
            if (element.navigation) {
                const hasChild = element.navigation.find(el => el.link === link);
                if (hasChild) {
                    site = hasChild;
                }
            }
            if (element.link === link) {
                site = element;
            }
        });
        return site;
    }
    
    render() {
        let errMessage = null;

        if (!this.state.validConfig) {
            errMessage = <Alert variant='danger'>
                The <i>configuration.js</i> was not found or is corrupted. 
                Cannot build a proper Navigation.
            </Alert>
        }

        const theme = this.state.validConfig.theme ? this.state.validConfig.theme : 'default';
        themeLoader(theme);
        // render
        return (
            <div 
                className={classes.Layout} 
            >
                {
                    errMessage ? 
                    <Navigation dummy /> : 
                    <Navigation 
                        config={this.state.validConfig} 
                        navigator={this.navigateHandler} 
                    />
                }
                <div className={classes.Page}>
                {errMessage}
                <Notebook link={this.state.currentLink} site={this.state.currentSite} />               
                </div>
            </div>
        );
    }
}

export default Layout;