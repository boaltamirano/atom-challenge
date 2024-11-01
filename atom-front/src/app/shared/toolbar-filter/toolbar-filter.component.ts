import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/_reducers';

@Component({
  selector: 'atom-toolbar-filter',
  templateUrl: './toolbar-filter.component.html',
  styleUrls: ['./toolbar-filter.component.scss']
})
export class ToolbarFilterComponent {
  @Input() columnsGruop: any[] = [];
  @Input() showFilterSite: boolean = true;
  @Input() showFilterStore: boolean = true
  @Input() showFilterStatus: boolean = true
  @Input() showFilterDateRange: boolean = true
  @Input() showDownload: boolean = true
  @Input() placeholderFilterSearh: string = 'Buscar...'
  @Input() labelFilterSearh: string = 'ID de la Orden, N° de Orden y Consumidor'
  @Input() btnAddText: string = 'Nuevo registro'
  @Input() btnAddShow: boolean = false
  @Input() showDownloadPdf: boolean = false
  @Input() showFilterCustom: boolean = false
  @Input() settingFilterCustom!: {
    title: string,
    name: string
  }
  @Input() loadButton: boolean = false
  @Input() loadButtonPDF: boolean = false
  @Input() defaultCurrentDateRage: boolean = false

  site_id: string | null = null;
  disabledDateRange: boolean = false

  formFilters: FormGroup = new FormGroup({})
  private subscriptions: Subscription[] = [];


  @Output() eventAddClick = new EventEmitter<boolean>();
  @Output() clickDownload = new EventEmitter<boolean>();
  @Output() clickDownloadPdf = new EventEmitter<boolean>();
  @Output() eventOpctionClick = new EventEmitter<string | number | boolean>();
  @Output() eventBtnActionsMoreClick = new EventEmitter<string | number | boolean>();

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createFilter()
    this.activatedRoute.queryParams.subscribe(params => {
      this.loadFilterStore(params['site_id'])
      this.setDataFilter(params)
    })
    this.loadFilterSites()
    this.loadFilterStatus()
    this.loadFilterDateLast()
    this.loadFilterStore(null)
  }

  setDataFilter(data: any) {

  }

  createFilter() {
    this.formFilters = this.fb.group({
      date_ranger: [null]
    })
  }


  loadFilterSites() {
    
  }

  loadFilterStore(site_id: string | null) {
    
  }

  loadFilterStatus() {

  }

  loadFilterDateLast() {

  }


  selectDateRange(dateRange: string[] | undefined) {
    const currentParams = this.router.parseUrl(this.router.url).queryParams;

    if (dateRange && dateRange.length > 0) {
      if (dateRange[0]) {
        currentParams['date_init'] = dateRange[0]
      }
      if (dateRange[1]) {
        currentParams['date_end'] = dateRange[1]
      }
    } else {
      currentParams['date_init'] = ''
      currentParams['date_end'] = ''
    }
    this.router.navigate([], { queryParams: currentParams, queryParamsHandling: 'merge' });
  }

  setParamsRouter(key: string, value: any) {
    const currentParams = this.router.parseUrl(this.router.url).queryParams;
    currentParams[key] = value || undefined
    this.router.navigate([], { queryParams: currentParams, queryParamsHandling: 'merge' });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }


  openDialogSettingColumns(): void {
    
  }

}
