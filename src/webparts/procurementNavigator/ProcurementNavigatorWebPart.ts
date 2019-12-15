import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ProcurementNavigatorWebPartStrings';
import ProcurementNavigator from './components/ProcurementNavigator';
import { IProcurementNavigatorProps } from './components/IProcurementNavigatorProps';
import { mockArray } from './components/QuestionData';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IProcurementNavigatorWebPartProps {
  description: string;
  context: any;
  arrayToUse: any[];
}

export default class ProcurementNavigatorWebPart extends BaseClientSideWebPart<IProcurementNavigatorWebPartProps> {

  private get _isSharePoint(): boolean {
    return (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint);
  }
  
  private _getListItems(): Promise<any[]> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('procurementNavigator')/items?$select=Id,Title,questionId,questionText,choiceA,choiceB,choiceC,choiceTextA,choiceTextB,choiceTextC,endTextA,endTextB,endTextC", SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse.value;
      }) as Promise<any[]>;
  }

  public render(): void {
    // Check if the app is running on local or online environment
    if (!this._isSharePoint) {
      console.log("LOCAL");
      this.checkConditionPassToRender(mockArray);
    } else {
      // If online then grab the list and .THEN once that is done render the component to the DOM.
      console.log("ONLINE");
      this._getListItems().then(response => {      
        this.checkConditionPassToRender(response);
      });
    }
  }

  // Function to run inside the render methods IF statement so that I can pass the correct array depending on the environment
  // Pass the ProcurementNavigator PROP elements and envoke the ReactDom.render method inside the asyncronous call
  private checkConditionPassToRender(arrayPassed:any[]) {
    const element: React.ReactElement<IProcurementNavigatorProps> = React.createElement(
      ProcurementNavigator,
      {
        description: this.properties.description,
        context: this.context,
        arrayToUse: arrayPassed
      }
    );    
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
