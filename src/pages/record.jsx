import React from 'react';
import { Card, Descriptions, Tag, Typography } from 'antd';
import { UserOutlined, CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// Example of a more informative mock record, based on typical medical record fields
const mockPathologyDetails = {
  NOM_PAT: 'Spinal Cord Injury',
  DESCRIPTION: 'A spinal cord injury (SCI) is damage to the spinal cord that causes changes in its function, either temporary or permanent.',
  DATE_CONSULTATION: '2024-04-15',
  SEVERITY: 'Severe',
  DOCTOR: 'Dr. Alice Martin',
  HOSPITAL: 'General Hospital',
  TREATMENT: 'Physical therapy, medication, and regular follow-up.',
  STATUS: 'Under Treatment',
  NOTES: 'Patient shows gradual improvement. Next checkup in 3 months.'
};

const Record = () => {
  const pathologyDetails = mockPathologyDetails;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 16 }}>
      <Card
        title={
          <span>
            <InfoCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
            Pathology Record
          </span>
        }
        bordered
        style={{ boxShadow: '0 2px 8px #f0f1f2' }}
      >
        <Title level={3} style={{ marginBottom: 0 }}>
          <UserOutlined style={{ marginRight: 8 }} />
          {pathologyDetails.NOM_PAT}
        </Title>
        <Tag color={pathologyDetails.STATUS === 'Under Treatment' ? 'orange' : 'green'} style={{ marginBottom: 16 }}>
          {pathologyDetails.STATUS}
        </Tag>
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Description">
            <Paragraph>{pathologyDetails.DESCRIPTION}</Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Severity">
            <Tag color={pathologyDetails.SEVERITY === 'Severe' ? 'red' : 'blue'}>
              {pathologyDetails.SEVERITY}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Doctor">
            {pathologyDetails.DOCTOR}
          </Descriptions.Item>
          <Descriptions.Item label="Hospital">
            {pathologyDetails.HOSPITAL}
          </Descriptions.Item>
          <Descriptions.Item label="Last Consultation">
            <CalendarOutlined style={{ marginRight: 4 }} />
            {new Date(pathologyDetails.DATE_CONSULTATION).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Treatment">
            <Paragraph>{pathologyDetails.TREATMENT}</Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Notes">
            <Paragraph type="secondary">{pathologyDetails.NOTES}</Paragraph>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Record;
