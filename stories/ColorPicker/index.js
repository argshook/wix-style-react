import React from 'react';
import {storiesOf} from '@storybook/react';

import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import AutoDocs from '../utils/Components/AutoDocs';
import TabbedView from '../utils/Components/TabbedView';
import ColorPicker from '!raw-loader!../../src/ColorPicker/color-picker';

import ExampleInteractive from './ExampleInteractive';

storiesOf('Core', module)
  .add('ColorPicker', () => (
    <TabbedView tabs={['Example', 'API']}>
      <InteractiveCodeExample title="Customize <ColorPicker/>" autoExpand={false}>
        <ExampleInteractive/>
      </InteractiveCodeExample>

      <AutoDocs source={ColorPicker}/>
    </TabbedView>
  ));
