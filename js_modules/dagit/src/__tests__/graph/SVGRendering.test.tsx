import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { StyleSheetManager } from "styled-components";
import { Colors } from "@blueprintjs/core";
import pretty from "pretty";
import path from "path";
import fs from "fs";

import { PipelineGraphContents } from "../../graph/PipelineGraph";
import { getDagrePipelineLayout } from "../../graph/getFullSolidLayout";
import { PipelineExplorerRootQuery_pipelineOrError_Pipeline } from "../../types/PipelineExplorerRootQuery";
import { PipelineGraphSolidFragment } from "../../graph/types/PipelineGraphSolidFragment";
import { MOCKS } from "./SVGMocks";

const snapshotsDir = path.join(__dirname, "__snapshots__");

function readMock(mock: { filepath: string }) {
  const { data } = JSON.parse(fs.readFileSync(mock.filepath).toString());
  return data.pipelineOrError as PipelineExplorerRootQuery_pipelineOrError_Pipeline;
}

function svgForPipeline(
  name: string,
  solids: PipelineGraphSolidFragment[],
  parent?: PipelineGraphSolidFragment
) {
  // render the pipeline explorer's viewport contents to SVG and capture
  // styled-component styles into a <div>
  const layout = getDagrePipelineLayout(solids, parent);
  const div = document.createElement("div");
  const svgContent = ReactDOM.renderToStaticMarkup(
    <StyleSheetManager target={div}>
      <PipelineGraphContents
        minified={false}
        solids={solids}
        parentSolid={parent}
        pipelineName={name}
        layout={layout}
        backgroundColor={Colors.LIGHT_GRAY5}
        highlightedSolids={[]}
      />
    </StyleSheetManager>
  );

  return pretty(
    `<svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewbox="0 0 ${layout.width} ${layout.height}"
      width="${layout.width}"
      height="${layout.height}"
    >
      ${div.innerHTML}
      ${svgContent}
    </svg>`
  );
}

MOCKS.forEach(mock => {
  it(`${mock.name}: renders the expected SVG`, () => {
    // load the GraphQL response and pull out the first layer of solids
    const solids = readMock(mock)
      .solidHandles.filter(h => !h.parent)
      .map(h => h.solid);

    const expectedPath = path.join(snapshotsDir, `${mock.name}.svg`);
    const actualPath = path.join(snapshotsDir, `${mock.name}.actual.svg`);
    const actual = svgForPipeline(mock.name, solids);

    // write out the actual result for easy visual comparison and compare to existing
    fs.writeFileSync(actualPath, actual);
    if (fs.existsSync(expectedPath)) {
      expect(fs.readFileSync(expectedPath).toString()).toEqual(actual);
    }
  });
});

it(`renders the expected SVG when viewing a composite`, () => {
  // load the GraphQL response and pull out the first layer of solids
  const pipeline = readMock(MOCKS[0]);
  const parentId = "master_cord_s3_to_df";
  const parent = pipeline.solidHandles.find(h => h.handleID === parentId)!
    .solid;

  const solids = pipeline.solidHandles
    .filter(h => h.parent && h.parent.handleID === parentId)
    .map(h => h.solid);

  const expectedPath = path.join(snapshotsDir, `airline-composite.svg`);
  const actualPath = path.join(snapshotsDir, `airline-composite.actual.svg`);
  const actual = svgForPipeline(name, solids, parent);

  // write out the actual result for easy visual comparison and compare to existing
  fs.writeFileSync(actualPath, actual);
  if (fs.existsSync(expectedPath)) {
    expect(fs.readFileSync(expectedPath).toString()).toEqual(actual);
  }
});
