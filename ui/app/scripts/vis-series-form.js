/*******************************************************************************
 *    ___                  _   ____  ____
 *   / _ \ _   _  ___  ___| |_|  _ \| __ )
 *  | | | | | | |/ _ \/ __| __| | | |  _ \
 *  | |_| | |_| |  __/\__ \ |_| |_| | |_) |
 *   \__\_\\__,_|\___||___/\__|____/|____/
 *
 * Copyright (C) 2014-2019 Appsicle
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 ******************************************************************************/

/*globals jQuery:false */

(function ($) {
        'use strict';
        $.fn.seriesForm = function () {
            const div = $(this);
            const fName = div.find('#_vis_frm_ser_name')[0];
            const fChartType = div.find('#_vis_frm_ser_chart_type')[0];
            const fColumns = div.find('#_vis_frm_ser_columns')[0];
            const fStack = div.find('#_vis_frm_ser_stack')[0];
            const fColor = div.find('#_vis_frm_ser_color')[0];
            const fAxis = div.find('#_vis_frm_ser_axis')[0];

            let last;

            function newQuery(index) {
                return {
                    id: '_li_series_' + index,
                    name: 'series' + index
                };
            }

            function copyToForm(series) {
                last = series;

                fName.value = series.name;
                fChartType.value = series.chartType ? series.chartType : 'Line';
                fColumns.value = series.columns ? series.columns : '';
                fStack.value = series.stack ? series.stack : '';
                fColor.value = series.color ? series.color : '';
                fAxis.value = series.axis ? series.axis : '';
            }

            function copyToMem(series) {
                let changed = false;
                if (series.name !== fName.value) {
                    series.name = fName.value;
                    changed = true;
                }

                if (series.chartType !== fChartType.value) {
                    series.chartType = fChartType.value;
                    changed = true;
                }

                if (series.columns !== fColumns.value) {
                    series.columns = fColumns.value;
                    changed = true;
                }

                if (series.stack !== fStack.value) {
                    series.stack = fStack.value;
                    changed = true;
                }

                if (series.color !== fColor.value) {
                    series.color = fColor.value;
                    changed = true;
                }

                if (series.axis !== fAxis.value) {
                    series.axis = fAxis.value;
                    changed = true;
                }

                if (changed) {
                    series.timestamp = new Date().getTime();
                }

                if (series.callback) {
                    series.callback();
                }

                return true;
            }

            function clear() {
                fName.value = '';
                fChartType.value = 'Line';
                fColumns.value = '';
                fStack.value = '';
                fColor.value = '';
                fAxis.value = '';
            }

            function copyToLast() {
                if (last) {
                    copyToMem(last);
                }
            }

            fName.onfocusout = copyToLast;
            fChartType.onfocusout = copyToLast;
            fColumns.onfocusout = copyToLast;
            fStack.onfocusout = copyToLast;
            fColor.onfocusout = copyToLast;
            fAxis.onfocusout = copyToLast;

            return div.listManager(newQuery, copyToForm, copyToMem, clear);
        };
    }(jQuery)
);
