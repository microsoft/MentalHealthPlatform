// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import * as classes from './dashboard.css';
import CrisisPreview from './../CrisisPreview/crisis-preview';
import { TrendingPostsProvider } from '../TrendingPostsPreview/trending-posts-preview-provider';
import { TrendingKeywordsProvider } from './../TrendingKeywordsPreview/trending-keywords-preview-provider';

interface ITileProps {
	children: any;
	isBlue?: boolean;
}

const Tile = (props: ITileProps) => {
	const className = `${classes.Tile} ${props.isBlue ? classes.BlueBackground : classes.WhiteBackground}`;
	return (
		<div className={className}>
			{props.children}
		</div>
	);
}

const Dashboard = () => {
	return (
		<div className={classes.DashboardContainer}>
			<div className={classes.RowA}>
				<div className={classes.ColB}>
					<div className={classes.RowA}>
						<Tile><TrendingPostsProvider /></Tile>
					</div>
				</div>
				<div className={classes.ColC}>
					<div className={classes.RowA}>
						<Tile isBlue={true}><CrisisPreview /></Tile>
					</div>
					<div className={classes.RowB}>
						<Tile><TrendingKeywordsProvider /></Tile>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;