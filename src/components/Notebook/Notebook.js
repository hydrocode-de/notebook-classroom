import React, {Component} from 'react';
import classes from './Notebook.module.css';
import {notebookHttp} from '../../axios';
import Markdown from 'react-markdown';

import Alert from 'react-bootstrap/Alert';
import Spinner from '../Spinner/Spinner';
import ButtonOverlay from '../ButtonOverlay/ButtonOverlay';

/**
 * workflow: 
 *  - set loading state
 *  - load notebook
 *  - create buttons (binder, github etc)
 *  - render (by disabling loading state)
 */
class Notebook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            errored: !props.link,
            errMessage: !props.link ? 'Error. The requested site is not available or not of type .html.' : null,
            link: props.link,
            config: props.site,
            message: 'searching ' + props.link + '...',
            notebook: null,
            page: null,
            useContainer: true
        }
    }

    componentDidMount() {
        this.loadPage();
    }
    

    componentDidUpdate(prevProps, prevState) {
        // check that the link actually changed on the properties
        if ( prevProps.link !== this.props.link) {

            // DEV
//            console.log('Updated state. Props:');
//            console.log(this.props);

            this.setState({
                loading: true,
                errored: false,
                errMessage: null, 
                message: 'searching ' + this.props.link + '...', 
                link: this.props.link,
                config: this.props.site,
                useContainer: true
            }, this.loadPage);
        }
    }

    loadingFinishedHandler = () => {
        this.setState({loading: false});
    }

    updateMessageHandler = message => {
        this.setState({message: message});
    }

    /**
     * Actual implementation of loading request.
     * This should be called asychronously while the 
     * loading state should be true.
     * 
     * Dev: the response is only console.log at the moment
     */
    loadPage = () => {
        const pageType = this.state.config && this.state.config.type ? `/${this.state.config.type}/` : '/nb/';
        notebookHttp.get(pageType + this.state.link)
        .then(response => {
            this.setState({notebook: response.data}, this.buildPage);
        })
        .catch(error => {
            this.setState({
                errored: true, 
                errMessage: `The page ${this.state.link} could not be found.`
            });
        });
    }

    buildPage = () => {
        this.updateMessageHandler('loading data...');
        if (!this.state.notebook) {
            // either error or use the last notebook from state
            this.setState({
                errored: true, 
                loading: false,
                errMessage: `Cannot build a notebook page from ${this.state.link}`
            });
            return false;
        }

        // start building the page
        this.updateMessageHandler('building the page...');
        const [page, useContainer] = this.parseTypePageType();

        // set page but and stop loading when done.
        this.setState({page: page, useContainer: useContainer}, this.loadingFinishedHandler);
    }

    parseTypePageType = () => {
        // check if file ends on .html or .md
        const fileEnding = this.state.link.split('.').pop();

        // page container 
        let page = null;
        let useContainer = true;

        if (fileEnding === 'md') {
            page = (<Markdown source={this.state.notebook} />);
        } else {
            // here, more file specific stuff could be done
            //page = (<div className={classes.NbContainer} dangerouslySetInnerHTML={{__html: this.state.notebook}}></div>);
            page = (<iframe className={classes.NbContainer} srcDoc={this.state.notebook} title={this.state.link}></iframe>);
            useContainer = false;
        }

        return [page, useContainer];

    }

    render() {
        let  body = null;
        let buttons = null;

        // still loading
        if (this.state.loading) {
            body = <Spinner size="10x" message={this.state.message}></Spinner>
        }

        if (!this.state.loading && !this.state.errored && this.state.notebook) {
            body = this.state.page;
            if (!this.state.useContainer && this.state.config) {
                // add another check here, to be sure that link properties are there
                buttons = <ButtonOverlay github={this.state.config.github} binder={this.state.config.binder} />;
            }
        }

        // show a error message if needed
        if (this.state.errored) {
            body =  <Alert variant="danger">{this.state.errMessage ? this.state.errMessage : 'Unkown error occured.'}</Alert>
        }

        // parse the classes
        const clsArray = [classes.Notebook];
        if (this.state.useContainer) {
            clsArray.push('container');
            clsArray.push(classes.HasContainer);
        }

        return (
            <div className={clsArray.join(' ')}>
                {buttons}
                {body}
            </div>
        );
    }
}

export default Notebook;