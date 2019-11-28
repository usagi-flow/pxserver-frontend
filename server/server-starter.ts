import * as core from "pxserver-core";

export default class ServerStarter extends core.AbstractServerStarter
{
	private constructor(root? : string)
	{
		super(root);
	}

	protected start() : ServerStarter
	{
		this.startHTTPServer();

		return this;
	}

	public static start(root? : string) : ServerStarter
	{
		let starter : ServerStarter = new ServerStarter(root);

		starter.start();

		return starter;
	}
}