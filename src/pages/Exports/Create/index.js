import React, { Component } from 'react';
import { exportTaskLaunchedUrl } from 'pages/urls';
import { validateSCUser, launchExport } from 'services/Exports';
import HeadLine from 'components/Utils/HeadLine';
import Title from 'components/Utils/Title';

import Avatar from 'components/Profile/Avatar';

const SCUserForm = ({username, onChangeUser, onValidateUser, SCData, SCErrors}) => (
    <form className="columns" onSubmit={(e) => {e.preventDefault();  onValidateUser(e);}}>
      <div className="column is-12-mobile is-6-tablet">
        <div className="field">
          <p className="control">
            <input className="input" type="text" placeholder="Username sencritique"
                   value={username}
                   onChange={onChangeUser}
            />
            <p className="help">
              Saisissez le nom de votre profil SensCritique. ATTENTION : l'export ne fonctionnera que si votre profil et vos notes sont publics et visibles par tous.
            </p>
          </p>
        </div>
      </div>
      <div className="column is-12-mobile is-6-tablet">
        <div className="field">
          <p className="control">
            <button className="button is-info"
                    onClick={onValidateUser}
            >
              Vérifier mon pseudo
            </button>
          </p>
          <p className="help is-danger">
            {SCErrors}
          </p>          
        </div>
        {SCData && (
            <div className="box">
              <article className="media">
                <div className="media-left">
                  <Avatar
                    figureStyle={{display: "auto"}}
                    avatar={SCData.avatar}
                    alt={SCData.username}
                    size="is-64x64"
                  />
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong className="has-text-success">
                        Nous utiliserons ce pseudo
                      </strong>                      
                    </p>
                    <p>
                      <strong>
                        <a href={SCData.url}
                          target="_blank"
                        >
                          {SCData.username}
                        </a>                        
                      </strong>                   
                    </p>
                  </div>
                </div>
              </article>
            </div>
        )}
      </div>
    </form>
);

const ExportForm = ({exportForm, onCheckReleaseType, onCheckEraseField, errors, onSubmit}) => (
    <div>
      <div className="field">
        <label className="checkbox">
          <input type="checkbox" value={exportForm.erase.value} checked={exportForm.erase.checked} onChange={onCheckEraseField}/>
          {" "} Ecraser mes données en cas de conflit        
        </label>
        <p className="help">
          Si vous cochez cette case, les notes des albums que vous avez déja notés sur le site seront remplacées en cas de conflit, sinon elles seront conservées.
        </p>
      </div>
      <div className="field">
        <div className="field is-grouped mb-1">
          <p className="mr-2">Exporter : {" "}</p>
          {exportForm.releaseTypes.map((type, index) => (
              <label className="checkbox mr-2">
                <input type="checkbox" value={type.value} checked={type.checked} onChange={(e) => onCheckReleaseType(e, index)}/>
                {" "} {type.name}        
              </label>
          ))}
        </div>
          <p className="help">Les autres catégories (comme Mixtape ou Remix) ne sont pas prises en compte</p>  
      </div>
      <button className="button is-danger" onClick={onSubmit}>Récupérer mes données</button>
      <div>
        <p className="help is-danger">{errors}</p>  
      </div>
    </div>
);

export default class ExportCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SCUser: '',
            SCData: null,
            SCErrors: null,
            exportForm: {
                releaseTypes: [
                    {
                        value: "LP",
                        name: "Albums",
                        checked: true
                    },
                    {
                        value: "EP",
                        name: "EPs",
                        checked: true
                    },                    
                    {
                        value: "Live",
                        name: "Live",
                        checked: false
                    },
                    {
                        value: "Compilation",
                        name: "Compilations",
                        checked: false
                    },
                    {
                        value: "OST",
                        name: "Bande Originales",
                        checked: false
                    },
                ],
                erase: {
                    value: "erase",
                    name: "Erase Old",
                    checked: false
                }
            },
            exportErrors: ''
        };        
    }

    onCheckEraseField = (event) => {
        let checked = event.target.checked;
        this.setState((prevState) => {
            let { exportForm } = prevState;
            exportForm.erase.checked = checked;
            return {
                exportForm: exportForm
            };
        });
    }

    onCheckReleaseType = (event, index) => {
        // we need to save the event value before calling setState, since it is called asynchronously, therefore event.target becomes null when the arrow function inside setState is called
        let checked = event.target.checked;
        this.setState((prevState) => {
            let { exportForm } = prevState;
            exportForm.releaseTypes[index].checked = checked;
            return {
                exportForm: exportForm
            };
        });
    }

    changeSCUser = (e) => {
        this.setState({
            SCUser: e.target.value
        });
    }

    onValidateUser = () => {
        validateSCUser({username: this.state.SCUser}).then((response) => {
            this.setState({
                SCData: response.data,
                SCErrors: null
            });
        }).catch((error) => {            
            if (error.response.status === 404){
                this.setState({
                    SCData: null,
                    SCErrors: "Cet utilisateur n'existe pas"
                });
            }
        });
    }

    validateExportData = () => {
        let fields = this.state.exportForm.releaseTypes.filter(el => el.checked).map(el => el.value);
        if (fields.length === 0){
            this.setState({
                exportErrors: 'Veuillez choisir au moins un type d\'album'
            });
            return false;
        }

        if (!this.state.SCData || !this.state.SCData.url){
            this.setState({
                exportErrors: 'Veuillez d\'abord valider votre pseudo'
            });
            return false;
        }

        this.setState({
            exportErrors: ''
        });
        
        return {
            sc_url: this.state.SCData.url,
            erase: this.state.exportForm.erase.checked,
            fields: fields            
        };
    }

    launchExport = () => {
        let validatedData = this.validateExportData();
        if (validatedData && (window.confirm("Êtes-vous sur de vouloir exporter les données de ce compte Senscritique ? Cette action est irréversible, mais vous aurez accès à un rapport une fois la tâche terminée"))){
            launchExport(validatedData).then(() => {
                this.props.history.push(exportTaskLaunchedUrl());
            }).catch(error => {
                alert("Une erreur est survenue : " + JSON.stringify(error.response.data));
            });
        }
        
    }

    render() {
        let { SCUser, SCData, SCErrors, exportForm, exportErrors } = this.state;
        return (
            <div className="columns is-multiline is-mobile ml-0 mr-0">
              <Title title="Exporter mes données depuis un autre site"/>
              <div className="column is-12">
                <HeadLine
                  title={"Exportez vos données"}
                  titleClasses="is-size-1"
                  subtitle={"Vous avez un compte Senscritique ? Ne passez pas des jours à recopier vos notes d'albums ! Chez La Musithèque, on exporte vos données automatiquement en quelques clics ;)"}
                />
              </div>
              <div className="column has-background-white-bis is-12-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
                <h1 className="title has-text-centered">Configurer l'export</h1>
                <hr/>
                <SCUserForm
                  username={SCUser}
                  onChangeUser={this.changeSCUser}
                  onValidateUser={this.onValidateUser}
                  SCData={SCData}
                  SCErrors={SCErrors}
                />
                <ExportForm
                  exportForm={exportForm}
                  onCheckReleaseType={this.onCheckReleaseType}
                  onCheckEraseField={this.onCheckEraseField}
                  errors={exportErrors}
                  onSubmit={this.launchExport}
                />
                
              </div>              
            </div>
        );   
    }
}
