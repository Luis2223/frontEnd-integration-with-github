import styled from 'styled-components';

export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }

    a {
        color: #ffc38f;
        font-size: 16px;
        text-decoration: none;
    }
`;

export const IssueList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;
    }

    & + li {
        margin-top: 10px;
    }

    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #eee;
    }

    div {
        flex: 1;
        margin-left: 15px;

        strong {
            font-size: 16px;

            a {
                text-decoration: none;
                color: #333;

                &:hover {
                    color: #ffc38f;
                }
            }

            span {
                background: #eee;
                color: #333;
                border-radius: 2px;
                font-size: 12px;
                font-weight: 600;
                height: 20px;
                padding: 3px 4px;
                margin-left: 10px;
            }
        }

        p {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
        }
    }
`;

export const ChangeButton = styled.button`
    background: #ffb16e;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;
    height: 35px;

    display: inline-block;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
        background: #eee;
    }
`;

export const ContainerButtons = styled.div`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
