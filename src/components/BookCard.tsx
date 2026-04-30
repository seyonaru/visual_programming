import React from 'react';


interface BookCardProps {
    title: string;
    authors: string[];
    coverUrl: string;
};

export const BookCard: React.FC<BookCardProps> = ({ title, authors, coverUrl}) => {
    return (
        <div style ={cardStyle}>
            <div style = {imageContainerStyle}>
                {coverUrl ? (
                    <img src = {coverUrl} alt = {title} style = {imageStyle} />
                ) : (
                    <div style = {placeholderStyle}>No cover</div>
                )}
            </div>

            <div style = {infoStyle}>
                <h2 style = {titleStyle}>{title}</h2>

                <p style = {authorsStyle}>
                    {authors.join(', ')}
                </p>
            </div>
        </div>
    );
};

const cardStyle: React.CSSProperties= {
    width: '200px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '10px',
    margin: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    backgroundColor: '#fff',
};

const imageContainerStyle: React.CSSProperties = {
    height: '250px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: '10px',
};

const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
};

const placeholderStyle: React.CSSProperties = { 
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
};

const infoStyle: React.CSSProperties = {
    textAlign: 'center' as const,
};

const titleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    margin: '0 0 5px 0',
    color: '#333',
};

const authorsStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    margin: 0,
    color: '#777',
};