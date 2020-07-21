import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
    };

    // Carregar os dados do localStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    // Salvar os dados do localStorage
    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;

        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleDownload = (clone_url) => {
        window.open(clone_url);
    };

    handleInputChange = (e) => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const { newRepo, repositories } = this.state;
        const response = await api.get(`/repos/${newRepo}`);

        const data = {
            name: response.data.full_name,
            language: response.data.language,
            download_url: response.data.clone_url,
        };

        this.setState({
            repositories: [...repositories, data],
            newRepo: '',
            loading: false,
        });
    };

    render() {
        const { newRepo, loading, repositories } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map((repository) => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <strong>
                                <span key={String(repository.language)}>
                                    {repository.language}
                                </span>
                            </strong>
                            <div>
                                <FaDownload
                                    onClick={() => {
                                        this.handleDownload(
                                            repository.download_url
                                        );
                                    }}
                                />
                                <Link
                                    to={`/repository/${encodeURIComponent(
                                        repository.name
                                    )}`}
                                >
                                    Detalhes
                                </Link>
                            </div>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
