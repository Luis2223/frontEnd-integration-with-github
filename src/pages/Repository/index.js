import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
    Loading,
    Owner,
    IssueList,
    ChangeButton,
    ContainerButtons,
} from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        commits: [],
        loading: true,
    };

    async componentDidMount() {
        const { match } = this.props;

        const repoName = decodeURIComponent(match.params.repository);

        const [repository, commits] = await Promise.all([
            await api.get(`/repos/${repoName}`),
            await api.get(`/repos/${repoName}/commits`),
        ]);

        this.setState({
            loading: false,
            repository: repository.data,
            commits: commits.data,
        });
    }

    render() {
        const { repository, commits, loading } = this.state;

        if (loading) {
            return <Loading>Carregando</Loading>;
        }
        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>
                <ContainerButtons>
                    <div>
                        <ChangeButton>Commits</ChangeButton>
                        <ChangeButton disabled>Issues</ChangeButton>
                    </div>
                </ContainerButtons>
                <IssueList>
                    {commits.map((commit) => (
                        <li key={String(commit.node_id)}>
                            <img
                                src={
                                    commit.author
                                        ? commit.author.avatar_url
                                        : 'https://icon-library.net//images/icon-profile/icon-profile-20.jpg'
                                }
                                alt={commit.commit.author.name}
                            />
                            <div>
                                <strong>
                                    <a href={commit.html_url}>
                                        {commit.commit.message}
                                    </a>
                                    {/* {commit.labels.map((label) => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))} */}
                                </strong>
                                <p>{commit.commit.author.name}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
            </Container>
        );
    }
}
