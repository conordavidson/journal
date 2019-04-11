### JOURNAL

Create photo/video journals with a simple, declarative React API.

The syntax is as follows:
```
<Journal title="My Trip to Italy (2019)">
  <Chapter title="Venice" subtitle="March 24~28">
    <Page caption="I arrived in Venice!">
      <Image src="img/venice_1.jpg" />
      <Image src="img/venice_2.jpg" />
    </Page>
    <Page caption="Was greeted by busy streets.">
      <Image src="img/venice_3.jpg" />
      <Video src="img/venice_4.mov" />
    </Page>
  </Chapter>
  <Chapter title="Florence" subtitle="March 28~30">
    <Page caption="I arrived in Florence!">
      <Image src="img/florence_1.jpg" />
      <Video src="img/florence_2.mov" />
    </Page>
  </Chapter>
</Journal>
```
`Journals` have `Chapters`  
`Chapters` have `Pages`  
`Pages` have `Media` (Images / Videos / Maps (todo))

An app can be as simple as:
```
import React from "react";
import ReactDOM from "react-dom";
import Journal, { Chapter, Page, Image, Video } from 'journal';

const MyNewJournal = () => (
  <Journal title="My Trip to Italy (2019)">
    ...
  </Journal>
);

ReactDOM.render(<MyNewJournal />, document.getElementById("root"));
```
