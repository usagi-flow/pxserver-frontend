import { enableProdMode, PlatformRef, Type, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export default class AngularStarter
{
	protected static instance : AngularStarter;

	protected module : Type<any>;

	public setModule(module : Type<any>) : AngularStarter
	{
		this.module = module;
		return this;
	}

	public async start() : Promise<NgModuleRef<any>>
	{
		if (environment.production)
			enableProdMode();

		let platform: PlatformRef = platformBrowserDynamic();

		try
		{
			return await platform.bootstrapModule(this.module ? this.module : AppModule);
		}
		catch (error)
		{
			console.error(error);
			return null;
		}
	}

	public static get() : AngularStarter
	{
		return AngularStarter.instance ? AngularStarter.instance : new AngularStarter();
	}
}