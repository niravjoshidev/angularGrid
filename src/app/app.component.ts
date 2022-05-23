import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CellValueChangedEvent, ColDef, GridApi,GridReadyEvent, RowValueChangedEvent  } from 'ag-grid-community';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularGrid';
  private gridApi!: GridApi;
  public rowSelection = 'single';
  public editType = 'fullRow';
  rowStyle:any={background: 'lightgray'};
  headerHeight:number=40;
  constructor(private http: HttpClient) {}

  public columnDefs : ColDef[] = [
    { field: 'athlete', minWidth: 150,checkboxSelection:true },
    { field: 'age', maxWidth: 90,filter:'agNumberColumnFilter' },
    { field: 'country', minWidth: 150, filter: 'agSetColumnFilter'},
    { field: 'year', maxWidth: 120,filter: 'agNumberColumnFilter'  },
    { field: 'date', minWidth: 150,filter: 'agDateColumnFilter' },
    { field: 'sport', minWidth: 150 },
    { field: 'gold',maxWidth: 110 },
    { field: 'silver',maxWidth: 110 },
    { field: 'bronze',maxWidth: 110 },
    { field: 'total',maxWidth: 110 }
	];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    resizable: true,
    editable:true,
    floatingFilter: true,
    menuTabs: ['generalMenuTab'],
  };

  public rowData!: any[];

  getRowStyle(params:any) :any{
    if (params.node.rowIndex % 2 === 0) {
      return { background: 'white' };
    }
  }


  onSelectionChanged(event:any){
    console.log(event);
    
    const selectedRows = this.gridApi.getSelectedRows();
    (document.querySelector('#selectedRows') as any).innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : '';
    console.log(selectedRows);
    
  }

    onCellValueChanged(event: CellValueChangedEvent) {
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }

  onRowValueChanged(event: RowValueChangedEvent) {
    var data = event.data;
    console.log(
      'onRowValueChanged: (' +
        data.athlete + 
        ')'
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    const url ='../assets/data.json';
    //const url ='https://www.ag-grid.com/example-assets/olympic-winners.json';
    this.http
      .get<any[]>(url)
      .subscribe((data) =>{
        this.rowData =data;
      })
  }
    
}
