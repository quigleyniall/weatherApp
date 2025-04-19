import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../../components/WeatherCard';

describe('WeatherCard', () => {
  it('renders correctly with provided props', () => {
    const props = {
      temperature: 25,
      weatherCode: 800,
      formattedTime: '12:00',
    };

    const { getByText } = render(<WeatherCard {...props} />);
    
    // Check if temperature is rendered
    expect(getByText('25')).toBeTruthy();
    
    // Check if time is rendered
    expect(getByText('12:00')).toBeTruthy();
  });

  it('renders with different weather codes', () => {
    const props = {
      temperature: 18,
      weatherCode: 200, // Different weather code
      formattedTime: '15:00',
    };

    const { getByText } = render(<WeatherCard {...props} />);
    
    // Check if temperature is rendered
    expect(getByText('18')).toBeTruthy();
    
    // Check if time is rendered
    expect(getByText('15:00')).toBeTruthy();
  });
}); 