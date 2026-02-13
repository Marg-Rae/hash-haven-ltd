import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon, GeoJSON } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { projectsAPI } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const DEFAULT_CENTER = [-0.0236, 37.9062];
const DEFAULT_ZOOM = 7;

const createMarkerIcon = () => {
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64">
			<defs>
				<linearGradient id="pin" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stop-color="#687959" />
					<stop offset="100%" stop-color="#9a7549" />
				</linearGradient>
			</defs>
			<path fill="url(#pin)" d="M32 2c-10.5 0-19 8.5-19 19 0 14.2 19 41 19 41s19-26.8 19-41c0-10.5-8.5-19-19-19z"/>
			<circle cx="32" cy="21" r="7" fill="#f3ede3" />
		</svg>
	`;

	return L.icon({
		iconUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
		iconSize: [36, 36],
		iconAnchor: [18, 36],
		popupAnchor: [0, -32],
	});
};

const defaultBoundary = {
	type: 'circle',
	center: DEFAULT_CENTER,
	radius: 320000,
	style: {
		color: '#526145',
		weight: 2,
		fillColor: '#c7d2c0',
		fillOpacity: 0.25,
	},
};

const LandMap = ({
	className = '',
	category,
	center = DEFAULT_CENTER,
	zoom = DEFAULT_ZOOM,
	boundary = defaultBoundary,
	geoJsonData,
}) => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;

		const fetchProjects = async () => {
			try {
				const params = category ? { category } : undefined;
				const response = await projectsAPI.getAll(params);
				if (!isMounted) return;
				setProjects(response.data.data || []);
				setError('');
			} catch (err) {
				if (!isMounted) return;
				setError('Unable to load project locations. Please try again soon.');
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchProjects();

		return () => {
			isMounted = false;
		};
	}, [category]);

	const markerIcon = useMemo(() => createMarkerIcon(), []);

	const validProjects = useMemo(
		() =>
			projects.filter((project) =>
				project.latitude !== null &&
				project.longitude !== null &&
				project.latitude !== '' &&
				project.longitude !== '' &&
				Number.isFinite(Number(project.latitude)) &&
				Number.isFinite(Number(project.longitude))
			),
		[projects]
	);

	const mapOverlay = (
		<div className="absolute inset-0 flex items-center justify-center bg-earth-50/80 backdrop-blur-sm">
			<LoadingSpinner message="Loading land intelligence map..." />
		</div>
	);

	if (error) {
		return (
			<div className={`card p-10 text-center ${className}`}>
				<div className="w-14 h-14 rounded-2xl bg-earth-100 flex items-center justify-center mx-auto mb-4">
					<FaMapMarkerAlt className="text-2xl text-earth-600" />
				</div>
				<h3 className="text-xl font-serif font-bold text-earth-900 mb-2">
					Map Unavailable
				</h3>
				<p className="text-earth-600">{error}</p>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 18 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			className={`relative w-full min-h-[500px] h-[60vh] max-h-[720px] rounded-3xl overflow-hidden shadow-2xl border border-earth-100 bg-earth-50 ${className}`}
		>
			<MapContainer
				center={center}
				zoom={zoom}
				scrollWheelZoom={false}
				className="h-full w-full"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{boundary?.type === 'polygon' && boundary.positions ? (
					<Polygon positions={boundary.positions} pathOptions={boundary.style} />
				) : (
					<Circle
						center={boundary.center || center}
						radius={boundary.radius || 250000}
						pathOptions={boundary.style}
					/>
				)}

				{geoJsonData ? (
					<GeoJSON data={geoJsonData} pathOptions={{ color: '#687959', weight: 2 }} />
				) : null}

				{validProjects.map((project) => {
					const latitude = Number(project.latitude);
					const longitude = Number(project.longitude);

					return (
						<Marker
							key={project._id || `${project.title}-${latitude}-${longitude}`}
							position={[latitude, longitude]}
							icon={markerIcon}
						>
							<Popup className="land-popup">
								<div className="space-y-2">
									<h3 className="text-base font-serif font-semibold text-earth-900">
										{project.title}
									</h3>
									<p className="text-sm text-earth-600 leading-relaxed">
										{project.description}
									</p>
									<div className="text-xs text-earth-500">
										Lat {latitude.toFixed(4)} · Lng {longitude.toFixed(4)}
									</div>
								</div>
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>

			{loading && mapOverlay}

			{!loading && validProjects.length === 0 && (
				<div className="absolute inset-0 flex items-center justify-center bg-earth-50/70">
					<div className="text-center">
						<div className="w-14 h-14 rounded-2xl bg-sage-100 flex items-center justify-center mx-auto mb-4">
							<FaMapMarkerAlt className="text-2xl text-sage-600" />
						</div>
						<p className="text-earth-700 font-medium">No mapped projects yet.</p>
						<p className="text-earth-500 text-sm">Add coordinates to begin mapping insights.</p>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default LandMap;
