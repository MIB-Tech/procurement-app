import React, {useEffect} from 'react';
import {Stimulsoft} from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';
import {toAbsoluteUrl} from '../../../../_metronic/helpers';
import {v4} from 'uuid';

type ReportViewerProps = {
  fileName: string
  params?: object
}

const id = v4();

const ReportViewer: React.FC<ReportViewerProps> = ({fileName, params}) => {
  useEffect(() => {
    const report = new Stimulsoft.Report.StiReport();
    report.loadFile(toAbsoluteUrl(`/stimulsoft/reports/${fileName}`));
    report.regData('JsonData', 'JsonData', params);
    const viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false);
    viewer.report = report;
    viewer.renderHtml(id);
    console.log(viewer);
  }, [fileName, params]);

  return <div id={id}/>;
};

export default ReportViewer;
