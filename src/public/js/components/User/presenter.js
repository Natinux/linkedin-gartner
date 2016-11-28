import React, {Component} from 'react';

export default class User extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    onKeyUp(e){
        if(e.keyCode == 13){
            this.postLinkedinUrl();
        }
    }

    postLinkedinUrl(){
        if(!this.refs.link.value){
            return;
        }

        this.setState({isLoading: true});
        const { onAddProfile } = this.props;

        onAddProfile(this.refs.link.value).catch(e => console.log(e));
        this.refs.link.value = "";
        setTimeout(() => {
            this.setState({isLoading: false});
        }, 500);
    }

    render(){

        let isLoading = this.state.isLoading;

        return (<div>
            <h1 className="display-3">Linkedin Profile Parser</h1>
            <p className="lead">add linkedin profiles and play with them :-)</p>
            <div className="row">
                <div className="col-lg-6">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Paste profile link here... e.g. https://www.linkedin.com/in/natinazarov" ref="link" onKeyUp={::this.onKeyUp}/>
                        <span className="input-group-btn">
                                <button className="btn btn-secondary"
                                        disabled={isLoading}
                                        onClick={!isLoading ? ::this.postLinkedinUrl : null}>
                                     {isLoading ? 'Parsing...' : 'Go!'}
                                </button>
                            </span>
                    </div>
                </div>
            </div>
        </div>);
    }
}