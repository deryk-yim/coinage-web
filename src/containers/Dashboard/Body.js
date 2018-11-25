import React from 'react';
import { BODY_TITLE } from '../Dashboard/BodyStyle';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import { Grid, Row, Col } from '../../components/Grid/Grid';

const Body = () => (
  <div>
    <Grid>
      <Row style={{ justifyContent: 'flex-start' }}>
        <h2 style={BODY_TITLE}>Dashboard</h2>
      </Row>
      <Row style={{ justifyContent: 'flex-start' }}>
        <Col size={{ xs: 8, sm: 4 }}>
          <DashboardCard
            label={'TRANSACTION'}
            value={300}
            timeFrame={'IN THE PAST 30 DAYS'}

            backgroundAngle={133}
            backgroundColors={['#5189DC', '#944BDB']}
          />
        </Col>
        <Col size={{ xs: 8, sm: 4 }}>
          <DashboardCard
            label={'BILLS'}
            value={300}
            timeFrame={'IN THE PAST 30 DAYS'}
            backgroundAngle={180}
            backgroundColors={['#F82279', '#934CDB']}
          />
        </Col>
        <Col size={{ xs: 8, sm: 4 }}>
          <DashboardCard
            label={'INSIGHTS'}
            value={300}
            timeFrame={'IN THE PAST 30 DAYS'}
            backgroundAngle={180}
            backgroundColors={['#FC9722', '#FD2472']}
          />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Body;
