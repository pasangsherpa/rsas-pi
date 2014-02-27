package com.rsaspi;

import android.app.Application;

import com.parse.Parse;

public class RsasApplication extends Application {

	@Override
	public void onCreate() {
		super.onCreate();
		Parse.initialize(this, "GabAeJSBADI5LJzFSdTzBX7Ru4Ns2Kq2UMhtXaI8", "7ahDDVlRIGO8iouik3MATbAGJNyzUgOWcArXzpQ7");
	}
}
