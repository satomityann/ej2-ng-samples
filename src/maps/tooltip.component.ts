import { Component, ViewEncapsulation } from '@angular/core';
import { MapsTheme, Maps, MapsTooltip, Legend, ITooltipRenderEventArgs, ILoadEventArgs } from '@syncfusion/ej2-ng-maps';
import { world_cup } from './MapData/SouthAmerica_Countries';
import { World_Map } from './MapData/WorldMap';

Maps.Inject(MapsTooltip, Legend);

/**
 * Maps tooltip
 */
@Component({
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    styleUrls: ['maps.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class MapsTooltipComponent {
    public tooltipRender = (args: ITooltipRenderEventArgs) => {
        if (args.content.toString().indexOf('undefined') > -1) {
            args.cancel = true;
        }
    };
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    public zoomSettings: object = {
        enable: false
    };

    public titleSettings: object = {
        text: 'Finalist in Cricket World Cup',
        titleStyle: { size: '16px' }
    };

    public legendSettings: object = {
        visible: true, mode: 'Interactive', position: 'Left',
        orientation: 'Vertical', height: '70%', width: '10'
    };

    public layers: object[] = [
        {
            shapeData: World_Map,
            shapePropertyPath: 'name',
            shapeDataPath: 'name',
            dataSource: world_cup,
            tooltipSettings: {
                visible: true,
                valuePath: 'name',
                template: '<div id="template"> <div class="toolback"> <div class="listing2"> <center> ${country} </center> </div> <hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"> <div> <span class="listing1">Finalist : </span><span class="listing2">${value1}</span> </div> <div> <span class="listing1">Win : </span><span class="listing2">${value2}</span> </div> </div> </div>'
            },
            shapeSettings: {
                fill: '#E5E5E5',
                colorMapping: [
                    {
                        value: '1',
                        color: '#b3daff'
                    },
                    {
                        color: '#80c1ff',
                        value: '2'
                    },
                    {
                        color: '#1a90ff',
                        value: '3'
                    },
                    {
                        color: '#005cb3',
                        value: '7'
                    }
                ],
                colorValuePath: 'value1'
            }
        }
    ];
    constructor() {
        //code
    };
}