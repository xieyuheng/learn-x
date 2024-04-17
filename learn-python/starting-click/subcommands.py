import click

@click.command()
def initdb():
    click.echo('Initialized the database')

@click.command()
def dropdb():
    click.echo('Dropped the database')

@click.group()
def main():
    pass

main.add_command(initdb)
main.add_command(dropdb)

if __name__ == '__main__':
    main()
