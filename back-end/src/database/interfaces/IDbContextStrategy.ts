export default interface IdbContextStrategy {
	isConnected(): void,
	connect(): void,
	create(): void,
	read(): void,
	update(): void,
	delete(): void
}
