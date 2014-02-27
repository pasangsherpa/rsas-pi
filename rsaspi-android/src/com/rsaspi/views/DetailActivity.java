package com.rsaspi.views;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;

import com.rsaspi.R;

public class DetailActivity extends Activity{
	/** Called when the activity is first created. */
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.detail);
	}
	
	@SuppressLint("NewApi")
	@Override
	public void onBackPressed() {
		this.finish();
		overridePendingTransition(R.anim.right_slide_in, R.anim.right_slide_out);
		return;
	}
}
