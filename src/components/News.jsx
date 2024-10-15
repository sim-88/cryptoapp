import React, { useState } from 'react';
import { Select, Typography, Row, Col, Card, Avatar } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import moment from 'moment';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency'); // Default category
  const { data: cryptoNews } = useGetCryptoNewsQuery({ query: newsCategory, count: simplified ? 6 : 12 }); // Use the selected category in query

  if (!cryptoNews?.data) return <Loader />;

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto Category"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)} // Update the news category on selection
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              <Option value="Bitcoin">Bitcoin</Option>
              <Option value="Ethereum">Ethereum</Option>
              <Option value="Blockchain">Blockchain</Option>
              <Option value="Ripple">Ripple</Option>
              <Option value="Litecoin">Litecoin</Option>
              <Option value="Cardano">Cardano</Option>
              <Option value="Polkadot">Polkadot</Option>
              <Option value="Stellar">Stellar</Option>
              <Option value="Chainlink">Chainlink</Option>
              <Option value="Dogecoin">Dogecoin</Option>
              <Option value="Solana">Solana</Option>
              <Option value="Avalanche">Avalanche</Option>
              <Option value="Shiba Inu">Shiba Inu</Option>
              <Option value="IOTA">IOTA</Option>
            </Select>
          </Col>
        )}

        {cryptoNews.data.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>{news.name}</Title>
                  <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news.logo || demoImage} alt="news" />
                </div>
                <p>
                  {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.favicon || demoImage} alt="" />
                    <Text className="provider-name">{news.name}</Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;


