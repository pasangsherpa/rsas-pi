package com.rsaspi.views;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

import com.rsaspi.R;

public class ShowNotification extends Activity {
	Button ok;
	Button cancel;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setTitle("Room Security Alert System");
		setContentView(R.layout.popup);
		ok = (Button) findViewById(R.id.ok);
		ok.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				Log.d("rsaspi", "Open Main Activity");
				Intent main = new Intent(v.getContext(), MainActivity.class);
				main.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
				v.getContext().getApplicationContext().startActivity(main);
			}
		});
		cancel = (Button) findViewById(R.id.cancel);
		cancel.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				Log.d("rsaspi", "Don't care about notification");
				finish();
			}
		});
	}

}
