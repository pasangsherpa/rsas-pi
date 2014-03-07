package com.rsaspi.receivers;

import java.util.Iterator;

import org.json.JSONException;
import org.json.JSONObject;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.rsaspi.views.ShowNotification;

public class NotificationReceiver extends BroadcastReceiver {

	@Override
	public void onReceive(Context context, Intent intent) {
		try {
			if (intent == null) {
				Log.d("rsaspi", "Receiver intent is null");
			} else {
				String action = intent.getAction();
				if (action.equals("com.rsaspi.UPDATE_STATUS")) {
					JSONObject json = new JSONObject(intent.getExtras()
							.getString("com.parse.Data"));
					Iterator itr = json.keys();
					while (itr.hasNext()) {
						String key = (String) itr.next();
						if (key.equals("customdata")) {
							Intent notification = new Intent(context,
									ShowNotification.class);
							notification
									.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
							context.getApplicationContext().startActivity(
									notification);
						}
					}
				}
			}
		} catch (JSONException e) {
			Log.d("rsaspi", "JSONException: " + e.getMessage());
		}

	}
}
