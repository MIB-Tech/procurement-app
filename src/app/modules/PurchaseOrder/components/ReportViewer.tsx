import React, {useEffect, useMemo, useState} from 'react';
import {Stimulsoft} from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';
import {v4} from 'uuid';
import StiViewer = Stimulsoft.Viewer.StiViewer;
import {toAbsoluteUrl} from '../../../../_metronic/helpers';

type ReportViewerProps = {
  fileName: string
  params?: object
}

const initialValue = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false)
const ReportViewer: React.FC<ReportViewerProps> = ({fileName, params}) => {
  const [viewer, setViewer] = useState(initialValue);
  const id = fileName

  const report = useMemo(() => {
    const reportInstance = new Stimulsoft.Report.StiReport();
    reportInstance.loadFile(toAbsoluteUrl(`/reports/${fileName}`));
    reportInstance.regData('JsonData', 'JsonData', params);

    return reportInstance;
  }, [fileName, params]);

  useEffect(() => {
    setViewer((currentViewer:StiViewer) => {
      currentViewer.report = report;

      return currentViewer;
    });

    viewer.renderHtml(id);
  }, [report, viewer, id]);

  return <div id={id}/>;
};

export default ReportViewer;
