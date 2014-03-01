package com.rsaspi.controllers;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.rsaspi.R;
import com.rsaspi.models.RoomActivity;

public class ActivityAdapter extends ArrayAdapter<RoomActivity> {
	private Context context;
	private List<RoomActivity> activities;

	public ActivityAdapter(Context context, List<RoomActivity> activities) {
		super(context, R.layout.main, activities);
		this.context = context;
		this.activities = activities;
	}

	public View getView(int position, View convertView, ViewGroup parent) {
		if (convertView == null) {
			LayoutInflater inflater = LayoutInflater.from(context);
			convertView = inflater.inflate(R.layout.activity_row_item, null);
		}

		RoomActivity activity = activities.get(position);
		TextView descriptionView = (TextView) convertView
				.findViewById(R.id.activity_id);
		SimpleDateFormat dateFormatGmt = new SimpleDateFormat(
				"EEE, MMM dd, yyyy @ hh:mm:ss a", Locale.US);
		dateFormatGmt.setTimeZone(TimeZone.getTimeZone("GMT"));
		String enteredAt = dateFormatGmt.format(activity.enteredAt()).toString();
		String date = enteredAt.substring(0, 3) +" - "+enteredAt.substring(5, 17);
		String time = enteredAt.substring(20, enteredAt.length());
		
		convertView.setTag(R.string.date, date);
		convertView.setTag(R.string.time, time);
		
		descriptionView.setText(enteredAt);
		return convertView;
	}
}
