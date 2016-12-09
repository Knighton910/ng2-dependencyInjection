//  Dependency Injection in Apps

/*  --   3 steps to perform Di
  1. Create the service class
  2. Declare the dependencies on the receiving component
  3. Configure the injection (i.e. register the injection with Angular in our NgModule)
*/

export class ApiService {
  get(): void {
    console.log('Getting resoure...')
  }
}

import  { ApiService } from 'services/ApiService'

class DiSampleApp {
  private apiService: ApiService
  constructor(@Inject(ApiService) apiService) {
    this.apiService = apiService
  }
}


@NgModule({
  declarations: [ DiSampleApp ],
  imports: [ BrowserModule ],
  bootstrap: [ DiSampleApp ],
  providers: [ ApiService ]
})
class DiSampleAppAppModule {}

plateformBrowserDynamic().bootstrapModule(DiSampleAppAppModule)
  .catch((err: any) -> console.error(err))

  //  Working with Injectors

  //  Here's how SmallService look like

  export class SmallService {
    run(): void {
      console.log('Small service...')
    }
  }

  // LargeService

  export class LargeService {
    run(): void {
      console.log('Large service...')
    }
  }

  //  View Port Service

  import {LargeService} from './LargeService'
  import {SmallService} from './SmallService'

  export class ViewPortService {
    determinService(): any {
      let w: number = Match.max(document.documentElement.clientWidth,
              window.innerWidth || 0 )

      if (w < 800) {
        return new SmallService()
      }
      return new LargeService()
    }
  }

  class DiSampleApp {
    constructor(private apiService: ApiService,
            @Inject('ApiServiceAlias') private aliasService: ApiService,
            @Inject('SizeServ ice') private sizeService: any)
  }



// To understand what each service represents, let's look at the NgModule:

@NgModule({
  declarations: [ DiSampleApp ],
  imports: [BrowserModule],
  bootstrap: [ DiSampleApp ],
  providers: [
    ApiService,
    ViewPortService,
    { provide: 'ApiServiceAlias', useExisting: ApiService },
    {
        provide: 'SizeService',
        useFactory: (viewport: any) => {
          return viewport.determineService()
        },
        deps: [ ViewPortService]
    }
  ]
})
class DiSampleAppAppModule {}
