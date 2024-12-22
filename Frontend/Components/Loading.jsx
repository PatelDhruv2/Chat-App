import React from 'react';

const Loading = ({ count = 3, widths = ['100%', '50%', '80%'], height = '16px' }) => {
    const skeletonArray = Array(count).fill(0);

    return (
        <div style={styles.darkBackground}>
            <div style={styles.center}>
                <div style={styles.container}>
                    {skeletonArray.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.skeleton,
                                height: index === 0 ? '80px' : height, // First skeleton is larger
                                width: widths[index % widths.length], // Dynamic widths based on array
                                marginTop: index > 0 ? '8px' : '0', // Add margin after the first skeleton
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    darkBackground: {
        backgroundColor: '#1e293b', // Dark slate color
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '200px',
        padding: '16px',
        backgroundColor: '#2d3748', // Slightly lighter dark shade for the skeleton container
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', // Adjusted shadow for dark background
    },
    skeleton: {
        background: 'linear-gradient(90deg, #4a5568 25%, #2d3748 50%, #4a5568 75%)', // Shimmer effect with dark tones
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '4px',
    },
};

export default Loading;
